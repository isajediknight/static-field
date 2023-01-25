# Basic modules
import datetime,os,sys,unittest,time

# Determine OS
if(sys.platform.lower().startswith('linux')):
    OS_TYPE = 'linux'
elif(sys.platform.lower().startswith('mac')):
    OS_TYPE = 'macintosh'
elif(sys.platform.lower().startswith('win')):
    OS_TYPE = 'windows'
else:
    OS_TYPE = 'invalid'

# Get our current directory
OUTPUT_FILE_DIRECTORY = os.getcwd()

# Simple string search
def find_all(a_str, sub):
    """
    Returns the indexes of {sub} where they were found in {a_str}.  The values
    returned from this function should be made into a list() before they can
    be easily used.
    """

    start = 0
    while True:
        start = a_str.find(sub, start)
        if start == -1: return
        yield start
        start += 1

# Create variables for all the paths
if((OS_TYPE == 'windows')):
    # Clear Screen Windows
    os.system('cls')
    directories = list(find_all(OUTPUT_FILE_DIRECTORY,'\\'))
    OUTPUTS_DIR = OUTPUT_FILE_DIRECTORY[:directories[-1]] + '\\outputs\\'
    INPUTS_DIR = OUTPUT_FILE_DIRECTORY[:directories[-1]] + '\\inputs\\'
    SCRIPTS_DIR = OUTPUT_FILE_DIRECTORY[:directories[-1]] + '\\scripts\\'
    MODULES_DIR = OUTPUT_FILE_DIRECTORY[:directories[-1]] + '\\modules\\'
    CLASSES_DIR = OUTPUT_FILE_DIRECTORY[:directories[-1]] + '\\classes\\'
elif((OS_TYPE == 'linux') or (OS_TYPE == 'macintosh')):
    # Clear Screen Linux / Mac
    os.system('clear')
    directories = list(find_all(OUTPUT_FILE_DIRECTORY,'/'))
    OUTPUTS_DIR = OUTPUT_FILE_DIRECTORY[:directories[-1]] + '/outputs/'
    INPUTS_DIR = OUTPUT_FILE_DIRECTORY[:directories[-1]] + '/inputs/'
    SCRIPTS_DIR = OUTPUT_FILE_DIRECTORY[:directories[-1]] + '/scripts/'
    MODULES_DIR = OUTPUT_FILE_DIRECTORY[:directories[-1]] + '/modules/'
    CLASSES_DIR = OUTPUT_FILE_DIRECTORY[:directories[-1]] + '/classes/'

# OS Compatibility for importing Class Files
if((OS_TYPE == 'linux')):
    sys.path.insert(0,'../classes/')
    sys.path.insert(0,'../modules/')
elif((OS_TYPE == 'windows')):
    sys.path.insert(0,'..\\classes\\')
    sys.path.insert(0,'..\\modules\\')

from constants import *
from benchmark import Benchmark
from testing_results import *

# Custom method for grabbing parameters from the commandline
from command_line_arguments import Parse

# Get command line argyments
# Change method call to ('dict',True) to get the parameters passed in
my_args = Parse()
my_args.add_expectation('-set-verbosity','integer',True,False)
my_args.add_expectation('-show-results-for','string',True,False)
my_args.add_expectation('-pass-fail-message','string',True,False)
my_args.add_expectation('-server-url','string',True,False)
my_args.parse_commandline()
my_args.validate_requirements()

# Variable for accessing all tests
all_tests_list = []

parameter_messages = ""

# Set verbosity of the Unit Test Class
#try:
if('-set-verbosity' in list(my_args.get_parameter_names())):
    set_verbosity = int(my_args.get_parameter('-set-verbosity').get_value())
else:
    print(tableau_20_red.colored('-set-verbosity was not passed in'))
    set_verbosity = 2
    parameter_messages += " -set-verbosity was not passed in\n"
##except:
##    set_verbosity = 2
##finally:
##    if(set_verbosity not in [0,2]):
##        parameter_messages += "\n -set-verbosity = " + str(set_verbosity) + " which is not valid\n"
##        parameter_messages += " You may pass in -set-verbosity with a value of 0 or 2\n"
##        parameter_messages += " 0 will display custom Pass/Fail test results\n"
##        parameter_messages += " 2 will display normal results\n"

try:
    if('-pass-fail-message' in list(my_args.get_parameter_names())):
        pass_fail_message = my_args.get_parameter('-pass-fail-message').get_value()
    else:
        pass_fail_message = 'string'
        parameter_messages += "\n -pass-fail-message was not passed in\n"
        parameter_messages += " -pass-fail-message was set to 'string'\n"
except:
    pass_fail_message = 'string'
finally:
    if(pass_fail_message not in ['string','number']):
        parameter_messages += "\n -pass-fail-message can be set to 'number' or 'string'\n"
        parameter_messages += " 'string' will show Passed or Failed in green or red\n"
        parameter_messages += " 'number' will show the test number in green or red\n"

try:
    if('-show-results-for' in list(my_args.get_parameter_names())):
        show_results_for = my_args.get_parameter('-show-results-for').get_value()
    else:
        show_results_for = 'both'
        parameter_messages += "\n -show-results-for was not passed in\n"
        parameter_messages += " -show-results-for was set to 'both'\n"
except:
    show_results_for = 'both'
finally:
    if(show_results_for not in ['both','passed','failed']):
        parameter_messages += "\n -show_results_for can be set to 'both' or 'passed' or 'failed'\n"
        parameter_messages += " 'both' will show all test results\n"
        parameter_messages += " 'passed' will show only passed tests\n"
        parameter_messages += " 'failed' will show only failed tests\n"

try:
    if('-server-url' in list(my_args.get_parameter_names())):
        server_url = my_args.get_parameter('-server-url').get_value()
    else:
        server_url = 'localhost:4000'
        parameter_messages += "\n -server-url was not passed in\n"
        parameter_messages += " -server-url was set to 'localhost:80'\n"
except:
    server_url = 'localhost:4000'
finally:
    if(server_url not in ['localhost:4000','10.87.1.125:4000']):
        parameter_messages += "\n -server-url can be set to 'localhost:4000' or '10.87.1.125:4000'\n"

if(set_verbosity == 0):

    if((OS_TYPE == 'windows')):
        print("\n Unit Testing: " + OUTPUT_FILE_DIRECTORY[:directories[-1]] + '\\' + my_args.get_script_file())
    else:
        print("\n Unit Testing: " + OUTPUT_FILE_DIRECTORY[:directories[-1]] + '/' + my_args.get_script_file())

# If any parameters were not correctly passed in display a helpful message
if(parameter_messages != ""):
    print(parameter_messages)

class TestAPIClass(unittest.TestCase):

    def test_benchmark_class_initializes_variables_to_zero(self):
        # Create an instance of Benchmark Class
        unit_test = Benchmark()

        try:
            check = 'unit_test.get_seconds() == 0'
            actual_comparison = (unit_test.get_seconds() == 0)
        except:
            actual_comparison = False
        description = tableau_10_blue.colored('getter') + " for " + tableau_10_purple.colored('seconds') + " in " + tableau_10_orange.colored('Benchmark')
        unit_sub_test = TestResults(description, actual_comparison, check)
        all_tests_list.append(unit_sub_test)
        if(set_verbosity != 0):
            assert(actual_comparison)

        unit_test.stop()

    def test_download_home_page(self):
        path_to_file = OUTPUTS_DIR + "home_page.html"
        fully_qualified_url = server_url
        try:
            os.system("curl -s "+server_url+" > " + path_to_file)
            actual_comparison = True
        except:
            actual_comparison = False
        description = tableau_10_blue.colored('curl') + " download of " + tableau_10_purple.colored(server_url) + " in " + tableau_10_orange.colored('use_express.js')
        unit_sub_test = TestResults(description, actual_comparison, "curl -s "+server_url+" > " + path_to_file)
        all_tests_list.append(unit_sub_test)
        if(set_verbosity != 0):
            assert (actual_comparison)

    def test_404_page(self):
        # the -k makes it trust self signed certificates
        # REMINDER create tests for real certificates
        # REMINDER create test for both http and https
        os.system("curl -s -k -w '%{response_code}' -s -o /dev/null " + '"https://'+str(server_url)+'/this_page_does_not_exist3534" > ' + OUTPUTS_DIR + "404.txt")

    def test_print_all_test_results(self):
        """
        Used to Print Testing Results to the screen on verbosity = 0
        This should always be the last unit test
        """

        if(set_verbosity == 0):
            for each_test in all_tests_list:
                # Print both passed and failed
                if(show_results_for == 'both'):
                    if(all_tests_list[0] == each_test):
                        print("")
                        
                    if(pass_fail_message == 'number'):
                        print(each_test.return_pass_or_fail_test_number_string(), end="")
                    elif(pass_fail_message == 'string'):
                        print(each_test.return_pass_or_fail_string(), end="")
                    else:
                        print(each_test.return_pass_or_fail_string(), end="")
                    print(each_test.description)
                    if(not each_test.result):
                        print(tableau_10_grey.colored("            " + each_test.check))
                              
                elif(show_results_for == 'failed'):

                    if(all_tests_list[0] == each_test and len(each_test.fail_counter) > 0):
                        print("")

                    if(not each_test.result):
                        if(pass_fail_message == 'number'):
                            print(each_test.return_pass_or_fail_test_number_string(), end="")
                        elif(pass_fail_message == 'string'):
                            print(each_test.return_pass_or_fail_string(), end="")
                        else:
                            print(each_test.return_pass_or_fail_string(), end="")
                        print(each_test.description)
                        if(not each_test.result):
                            print(tableau_10_grey.colored("            " + each_test.check))
                # Print only passed
                elif(show_results_for == 'passed'):

                    if(all_tests_list[0] == each_test):
                        print("")

                    if (each_test.result):
                        if (pass_fail_message == 'number'):
                            print(each_test.return_pass_or_fail_test_number_string(), end="")
                        elif (pass_fail_message == 'string'):
                            print(each_test.return_pass_or_fail_string(), end="")
                        else:
                            print(each_test.return_pass_or_fail_string(), end="")
                        print(each_test.description)
                        if (not each_test.result):
                            print(tableau_10_grey.colored("            " + each_test.check))

            fail = TestResults('Count Tests Run',True,'')

            print("")
            print(" Total Tests Run: " + str(len(fail.total_counter) - 1))
            print("")
            if(len(fail.fail_counter) == 0):
                display = tableau_10_green.colored('Passed')
                print(" [ " + display + " ] All "+str(len(fail.pass_counter) - 1)+" Tests!")
            else:
                display = tableau_10_green.colored('Passed')
                print(" [ " + display + " ] " + str(len(fail.pass_counter) - 1))
            display = tableau_10_red.colored('Failed')
            print(" [ " + display + " ] " + str(len(fail.fail_counter)))

            print("")

            # Only print the Legend if we got failures
            if(len(fail.fail_counter) > 0 or show_results_for == 'both' or show_results_for == 'passed'):
                print(" Color Legend:\n")
                display = tableau_10_green.colored(' Test Succeeded')
                print(display)
                display = tableau_10_red.colored(' Test Failed')
                print(display)
##                display = color_test.cc(' Method', 'blue')
##                print(display)
##                display = color_test.cc(' Variable', 'purple')
##                print(display)
##                display = color_test.cc(' Datatype', 'datatype')
##                print(display)
##                display = color_test.cc(' Class', 'orange')
##                print(display)
                print("")

# Run all the Unit Tests
suite = unittest.TestLoader().loadTestsFromTestCase(TestAPIClass)
unittest.TextTestRunner(verbosity=set_verbosity).run(suite)
